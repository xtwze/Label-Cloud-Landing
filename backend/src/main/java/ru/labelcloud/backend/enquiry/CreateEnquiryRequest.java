package ru.labelcloud.backend.enquiry;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateEnquiryRequest(
        @Size(max = 100) String contactName,
        @NotBlank @Size(max = 150) String labelName,
        @Email @Size(max = 254) String email,
        @NotBlank @Size(min = 7, max = 40) String phone,
        @NotBlank @Size(max = 100) String telegram,
        @Size(max = 2000) String comment,
        @AssertTrue boolean consent,
        @Size(max = 0) String website
) {
}
