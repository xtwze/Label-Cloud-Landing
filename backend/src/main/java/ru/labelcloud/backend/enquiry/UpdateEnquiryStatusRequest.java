package ru.labelcloud.backend.enquiry;

import jakarta.validation.constraints.NotNull;

public record UpdateEnquiryStatusRequest(@NotNull EnquiryStatus status) {
}
