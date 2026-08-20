package ru.labelcloud.backend.enquiry;

import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.util.Locale;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
class EnquiryService {

    private static final Duration DUPLICATE_WINDOW = Duration.ofMinutes(15);

    private final EnquiryRepository repository;
    private final Clock clock;

    @Autowired
    EnquiryService(EnquiryRepository repository) {
        this(repository, Clock.systemUTC());
    }

    EnquiryService(EnquiryRepository repository, Clock clock) {
        this.repository = repository;
        this.clock = clock;
    }

    @Transactional
    EnquirySubmission submit(CreateEnquiryRequest request) {
        Instant now = clock.instant();
        String normalizedEmail = request.email().trim().toLowerCase(Locale.ROOT);
        String normalizedPhone = request.phone().replaceAll("[^0-9+]", "");

        var duplicate = repository
                .findFirstByNormalizedEmailAndNormalizedPhoneAndCreatedAtAfterOrderByCreatedAtDesc(
                        normalizedEmail,
                        normalizedPhone,
                        now.minus(DUPLICATE_WINDOW)
                );

        if (duplicate.isPresent()) {
            return new EnquirySubmission(new EnquiryResponse(duplicate.get().getId(), true), false);
        }

        Enquiry enquiry = new Enquiry(
                UUID.randomUUID(),
                request.contactName().trim(),
                request.labelName().trim(),
                request.email().trim(),
                normalizedEmail,
                request.phone().trim(),
                normalizedPhone,
                normalizeTelegram(request.telegram()),
                normalizeComment(request.comment()),
                now
        );
        repository.save(enquiry);
        return new EnquirySubmission(new EnquiryResponse(enquiry.getId(), false), true);
    }

    private static String normalizeTelegram(String telegram) {
        String value = telegram.trim();
        return value.startsWith("@") ? value : "@" + value;
    }

    private static String normalizeComment(String comment) {
        if (comment == null || comment.isBlank()) {
            return null;
        }
        return comment.trim();
    }
}
