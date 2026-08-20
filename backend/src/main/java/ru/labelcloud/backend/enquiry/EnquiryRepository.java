package ru.labelcloud.backend.enquiry;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

interface EnquiryRepository extends JpaRepository<Enquiry, UUID> {

    Page<Enquiry> findAllByStatus(EnquiryStatus status, Pageable pageable);

    Optional<Enquiry> findFirstByNormalizedEmailAndNormalizedPhoneAndCreatedAtAfterOrderByCreatedAtDesc(
            String normalizedEmail,
            String normalizedPhone,
            Instant createdAfter
    );
}
