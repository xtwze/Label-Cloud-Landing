package ru.labelcloud.backend.enquiry;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneOffset;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class EnquiryServiceTest {

    private static final Instant NOW = Instant.parse("2026-08-20T10:00:00Z");

    @Mock
    private EnquiryRepository repository;

    @Test
    void savesNormalizedEnquiry() {
        when(repository.findFirstByNormalizedEmailAndNormalizedPhoneAndCreatedAtAfterOrderByCreatedAtDesc(
                any(), any(), any())).thenReturn(Optional.empty());
        EnquiryService service = new EnquiryService(repository, Clock.fixed(NOW, ZoneOffset.UTC));

        EnquirySubmission result = service.submit(validRequest());

        assertThat(result.created()).isTrue();
        assertThat(result.response().duplicate()).isFalse();
        ArgumentCaptor<Enquiry> captor = ArgumentCaptor.forClass(Enquiry.class);
        verify(repository).save(captor.capture());
        assertThat(captor.getValue().getId()).isEqualTo(result.response().id());
    }

    @Test
    void reusesRecentMatchingEnquiry() {
        UUID existingId = UUID.randomUUID();
        Enquiry existing = new Enquiry(existingId, "Михаил", "XLORA", "mail@example.com",
                "mail@example.com", "+7 999 000-00-00", "+79990000000", "@xtwze", null, NOW.minusSeconds(60));
        when(repository.findFirstByNormalizedEmailAndNormalizedPhoneAndCreatedAtAfterOrderByCreatedAtDesc(
                any(), any(), any())).thenReturn(Optional.of(existing));
        EnquiryService service = new EnquiryService(repository, Clock.fixed(NOW, ZoneOffset.UTC));

        EnquirySubmission result = service.submit(validRequest());

        assertThat(result.created()).isFalse();
        assertThat(result.response()).isEqualTo(new EnquiryResponse(existingId, true));
        verify(repository, never()).save(any());
    }

    @Test
    void savesMinimalEnquiryAndChecksDuplicatesByPhoneAndTelegram() {
        when(repository.findFirstByNormalizedPhoneAndTelegramAndCreatedAtAfterOrderByCreatedAtDesc(
                any(), any(), any())).thenReturn(Optional.empty());
        EnquiryService service = new EnquiryService(repository, Clock.fixed(NOW, ZoneOffset.UTC));

        EnquirySubmission result = service.submit(new CreateEnquiryRequest(
                null, " XLORA ", null, "+7 999 000-00-00", "xtwze", null, null, ""
        ));

        assertThat(result.created()).isTrue();
        ArgumentCaptor<Enquiry> captor = ArgumentCaptor.forClass(Enquiry.class);
        verify(repository).save(captor.capture());
        assertThat(captor.getValue().getContactName()).isNull();
        assertThat(captor.getValue().getEmail()).isNull();
        assertThat(captor.getValue().getTelegram()).isEqualTo("@xtwze");
    }

    private static CreateEnquiryRequest validRequest() {
        return new CreateEnquiryRequest(
                " Михаил ", " XLORA ", "MAIL@example.com ", "+7 999 000-00-00",
                "xtwze", "Комментарий", true, ""
        );
    }
}
