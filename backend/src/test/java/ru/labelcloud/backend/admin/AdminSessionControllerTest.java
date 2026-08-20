package ru.labelcloud.backend.admin;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import ru.labelcloud.backend.config.SecurityConfig;

@WebMvcTest(
        controllers = AdminSessionController.class,
        properties = {
                "labelcloud.admin.username=owner",
                "labelcloud.admin.password={noop}secret"
        }
)
@Import(SecurityConfig.class)
class AdminSessionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void rejectsAnonymousSessionRequest() throws Exception {
        mockMvc.perform(get("/api/admin/session"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void createsAuthenticatedSession() throws Exception {
        MvcResult login = mockMvc.perform(post("/api/admin/login")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username":"owner","password":"secret"}
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.authenticated").value(true))
                .andExpect(jsonPath("$.username").value("owner"))
                .andReturn();

        MockHttpSession session = (MockHttpSession) login.getRequest().getSession(false);
        mockMvc.perform(get("/api/admin/session").session(session))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("owner"));
    }

    @Test
    void rejectsWrongPassword() throws Exception {
        mockMvc.perform(post("/api/admin/login")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username":"owner","password":"wrong"}
                                """))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void requiresCsrfForLogin() throws Exception {
        mockMvc.perform(post("/api/admin/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username":"owner","password":"secret"}
                                """))
                .andExpect(status().isForbidden());
    }
}
