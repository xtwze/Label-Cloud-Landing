package ru.labelcloud.backend.enquiry;

import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
class AdminEnquiryService {

    private static final int MAX_PAGE_SIZE = 100;

    private final EnquiryRepository repository;

    AdminEnquiryService(EnquiryRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    AdminEnquiryPage list(int page, int size, EnquiryStatus status) {
        int safePage = Math.max(0, page);
        int safeSize = Math.clamp(size, 1, MAX_PAGE_SIZE);
        PageRequest pageable = PageRequest.of(
                safePage,
                safeSize,
                Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Enquiry> enquiries = status == null
                ? repository.findAll(pageable)
                : repository.findAllByStatus(status, pageable);
        return new AdminEnquiryPage(
                enquiries.stream().map(AdminEnquiryResponse::from).toList(),
                enquiries.getNumber(),
                enquiries.getSize(),
                enquiries.getTotalElements(),
                enquiries.getTotalPages());
    }

    @Transactional
    AdminEnquiryResponse updateStatus(UUID id, EnquiryStatus status) {
        Enquiry enquiry = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
        enquiry.changeStatus(status);
        return AdminEnquiryResponse.from(enquiry);
    }
}
