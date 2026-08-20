package ru.labelcloud.backend.enquiry;

import jakarta.validation.Valid;
import java.util.UUID;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/enquiries")
class AdminEnquiryController {

    private final AdminEnquiryService service;

    AdminEnquiryController(AdminEnquiryService service) {
        this.service = service;
    }

    @GetMapping
    AdminEnquiryPage list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "25") int size,
            @RequestParam(required = false) EnquiryStatus status
    ) {
        return service.list(page, size, status);
    }

    @PatchMapping("/{id}/status")
    AdminEnquiryResponse updateStatus(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateEnquiryStatusRequest request
    ) {
        return service.updateStatus(id, request.status());
    }
}
