package ru.labelcloud.backend.enquiry;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.Instant;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import ru.labelcloud.backend.config.SecurityConfig;

@WebMvcTest(controllers = AdminEnquiryController.class)
@Import(SecurityConfig.class)
class AdminEnquiryControllerTest {

    private static final UUID ENQUIRY_ID = UUID.fromString("0dd16839-cf92-425f-b0aa-6acdfe1f190d");
    private static final Instant CREATED_AT = Instant.parse("2026-08-20T10:00:00Z");

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private AdminEnquiryService service;

    @Test
    void rejectsAnonymousListRequest() throws Exception {
        mockMvc.perform(get("/api/admin/enquiries"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void returnsEnquiriesForAdmin() throws Exception {
        when(service.list(anyInt(), anyInt(), any())).thenReturn(new AdminEnquiryPage(
                List.of(response(EnquiryStatus.NEW)), 0, 25, 1, 1));

        mockMvc.perform(get("/api/admin/enquiries"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.items[0].id").value(ENQUIRY_ID.toString()))
                .andExpect(jsonPath("$.items[0].labelName").value("XLORA"))
                .andExpect(jsonPath("$.items[0].status").value("NEW"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void updatesStatusWithCsrfProtection() throws Exception {
        when(service.updateStatus(ENQUIRY_ID, EnquiryStatus.CONTACTED))
                .thenReturn(response(EnquiryStatus.CONTACTED));

        mockMvc.perform(patch("/api/admin/enquiries/{id}/status", ENQUIRY_ID)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"status":"CONTACTED"}
                                """))
                .andExpect(status().isForbidden());

        mockMvc.perform(patch("/api/admin/enquiries/{id}/status", ENQUIRY_ID)
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"status":"CONTACTED"}
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("CONTACTED"));
    }

    private static AdminEnquiryResponse response(EnquiryStatus status) {
        return new AdminEnquiryResponse(
                ENQUIRY_ID,
                "Михаил",
                "XLORA",
                "mail@example.com",
                "+7 999 000-00-00",
                "@xtwze",
                "Нужна демонстрация",
                status,
                CREATED_AT,
                CREATED_AT);
    }
}
