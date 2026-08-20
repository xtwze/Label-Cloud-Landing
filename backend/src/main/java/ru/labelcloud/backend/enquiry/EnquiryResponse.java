package ru.labelcloud.backend.enquiry;

import java.util.UUID;

public record EnquiryResponse(UUID id, boolean duplicate) {
}
