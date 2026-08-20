package ru.labelcloud.backend.enquiry;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import ru.labelcloud.backend.config.SecurityConfig;

@WebMvcTest(controllers = EnquiryController.class)
@Import(SecurityConfig.class)
class EnquiryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private EnquiryService enquiryService;

    @Test
    void acceptsValidEnquiry() throws Exception {
        UUID id = UUID.randomUUID();
        when(enquiryService.submit(any())).thenReturn(new EnquirySubmission(new EnquiryResponse(id, false), true));

        mockMvc.perform(post("/api/public/enquiries")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(validJson()))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(id.toString()))
                .andExpect(jsonPath("$.duplicate").value(false));
    }

    @Test
    void rejectsMissingConsentAndInvalidContacts() throws Exception {
        mockMvc.perform(post("/api/public/enquiries")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "contactName": "М",
                                  "labelName": "",
                                  "email": "wrong",
                                  "phone": "1",
                                  "telegram": "",
                                  "consent": false,
                                  "website": ""
                                }
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Проверьте заполнение формы"));
        verifyNoInteractions(enquiryService);
    }

    @Test
    void rejectsFilledHoneypot() throws Exception {
        mockMvc.perform(post("/api/public/enquiries")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(validJson().replace("\"website\": \"\"", "\"website\": \"spam.example\"")))
                .andExpect(status().isBadRequest());
        verifyNoInteractions(enquiryService);
    }

    private static String validJson() {
        return """
                {
                  "contactName": "Михаил",
                  "labelName": "XLORA",
                  "email": "mail@example.com",
                  "phone": "+7 999 000-00-00",
                  "telegram": "@xtwze",
                  "comment": "Нужна демонстрация",
                  "consent": true,
                  "website": ""
                }
                """;
    }
}
