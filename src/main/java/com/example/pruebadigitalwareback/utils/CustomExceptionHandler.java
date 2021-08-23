package com.example.pruebadigitalwareback.utils;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(Exception.class)
    public final ResponseEntity handlerException(Exception exception) {
        Map<String, Object> response = new HashMap();
        response.put("error", exception.getMessage());
        return ResponseEntity.internalServerError().body(response);
    }
}
