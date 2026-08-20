package ru.labelcloud.backend.enquiry;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "enquiries")
class Enquiry {

    @Id
    private UUID id;

    @Column(name = "contact_name", nullable = false, length = 100)
    private String contactName;

    @Column(name = "label_name", nullable = false, length = 150)
    private String labelName;

    @Column(nullable = false, length = 254)
    private String email;

    @Column(name = "normalized_email", nullable = false, length = 254)
    private String normalizedEmail;

    @Column(nullable = false, length = 40)
    private String phone;

    @Column(name = "normalized_phone", nullable = false, length = 40)
    private String normalizedPhone;

    @Column(nullable = false, length = 100)
    private String telegram;

    @Column(length = 2000)
    private String comment;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private EnquiryStatus status;

    @Column(name = "consented_at", nullable = false)
    private Instant consentedAt;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    protected Enquiry() {
    }

    Enquiry(UUID id, String contactName, String labelName, String email, String normalizedEmail,
            String phone, String normalizedPhone, String telegram, String comment, Instant now) {
        this.id = id;
        this.contactName = contactName;
        this.labelName = labelName;
        this.email = email;
        this.normalizedEmail = normalizedEmail;
        this.phone = phone;
        this.normalizedPhone = normalizedPhone;
        this.telegram = telegram;
        this.comment = comment;
        this.status = EnquiryStatus.NEW;
        this.consentedAt = now;
        this.createdAt = now;
    }

    UUID getId() {
        return id;
    }

    String getContactName() {
        return contactName;
    }

    String getLabelName() {
        return labelName;
    }

    String getEmail() {
        return email;
    }

    String getPhone() {
        return phone;
    }

    String getTelegram() {
        return telegram;
    }

    String getComment() {
        return comment;
    }

    EnquiryStatus getStatus() {
        return status;
    }

    Instant getConsentedAt() {
        return consentedAt;
    }

    Instant getCreatedAt() {
        return createdAt;
    }

    void changeStatus(EnquiryStatus status) {
        this.status = status;
    }
}
