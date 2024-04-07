package com.myapp.app.model;

import com.myapp.app.common.ErrorDetail;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ErrorModel {
    private String message;
    private HttpStatus httpStatus;
    private List<ErrorDetail> errorDetails;
}
