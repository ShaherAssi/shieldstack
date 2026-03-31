package com.shieldstack.api.health;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;


@RestController
public class HealthController {
@GetMapping("/health")
public ResponseEntity<Map<String, String>> health() {
return new ResponseEntity<>(Map.of("status", "ok"), HttpStatus.OK);
}
}