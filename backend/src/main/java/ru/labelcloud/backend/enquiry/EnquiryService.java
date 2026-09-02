package ru.labelcloud.backend.enquiry;

import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.util.Locale;
import java.util.Optional;
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
        String email = normalizeOptional(request.email());
        String normalizedEmail = email == null ? null : email.toLowerCase(Locale.ROOT);
        String normalizedPhone = request.phone().replaceAll("[^0-9+]", "");
        String telegram = normalizeTelegram(request.telegram());

        Optional<Enquiry> duplicate = normalizedEmail == null
                ? repository.findFirstByNormalizedPhoneAndTelegramAndCreatedAtAfterOrderByCreatedAtDesc(
                        normalizedPhone,
                        telegram,
                        now.minus(DUPLICATE_WINDOW)
                )
                : repository.findFirstByNormalizedEmailAndNormalizedPhoneAndCreatedAtAfterOrderByCreatedAtDesc(
                        normalizedEmail,
                        normalizedPhone,
                        now.minus(DUPLICATE_WINDOW)
                );

        if (duplicate.isPresent()) {
            return new EnquirySubmission(new EnquiryResponse(duplicate.get().getId(), true), false);
        }

        Enquiry enquiry = new Enquiry(
                UUID.randomUUID(),
                normalizeOptional(request.contactName()),
                request.labelName().trim(),
                email,
                normalizedEmail,
                request.phone().trim(),
                normalizedPhone,
                telegram,
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

    private static String normalizeOptional(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return value.trim();
    }
}
