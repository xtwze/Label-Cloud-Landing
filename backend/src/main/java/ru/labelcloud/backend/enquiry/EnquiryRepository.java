package ru.labelcloud.backend.enquiry;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

interface EnquiryRepository extends JpaRepository<Enquiry, UUID> {

    Optional<Enquiry> findFirstByNormalizedEmailAndNormalizedPhoneAndCreatedAtAfterOrderByCreatedAtDesc(
            String normalizedEmail,
            String normalizedPhone,
            Instant createdAfter
    );
}
