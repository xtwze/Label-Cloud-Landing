package ru.labelcloud.backend.enquiry;

import jakarta.validation.Valid;
import java.net.URI;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/enquiries")
class EnquiryController {

    private final EnquiryService enquiryService;

    EnquiryController(EnquiryService enquiryService) {
        this.enquiryService = enquiryService;
    }

    @PostMapping
    ResponseEntity<EnquiryResponse> create(@Valid @RequestBody CreateEnquiryRequest request) {
        EnquirySubmission submission = enquiryService.submit(request);
        if (!submission.created()) {
            return ResponseEntity.ok(submission.response());
        }
        return ResponseEntity
                .created(URI.create("/api/public/enquiries/" + submission.response().id()))
                .body(submission.response());
    }
}
