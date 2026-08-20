package ru.labelcloud.backend.enquiry;

import java.util.List;

public record AdminEnquiryPage(
        List<AdminEnquiryResponse> items,
        int page,
        int size,
        long totalElements,
        int totalPages
) {
}
