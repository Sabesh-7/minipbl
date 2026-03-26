package com.sabes.workflow.rule_engine.service;

import org.junit.jupiter.api.Test;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

class RuleConditionEvaluatorTest {

    private final RuleConditionEvaluator evaluator = new RuleConditionEvaluator();

    @Test
    void evaluatesSimpleNumericAndBooleanCondition() {
        boolean result = evaluator.evaluate(
                "stock < 15 AND isFastSelling == true",
                Map.of("stock", 10, "isFastSelling", true)
        );

        assertTrue(result);
    }

    @Test
    void evaluatesInListCondition() {
        boolean result = evaluator.evaluate(
                "currency IN ['USD', 'EUR']",
                Map.of("currency", "USD")
        );

        assertTrue(result);
    }

    @Test
    void returnsFalseWhenConditionNotMet() {
        boolean result = evaluator.evaluate(
                "amount > 1000",
                Map.of("amount", 250)
        );

        assertFalse(result);
    }

    @Test
    void throwsExceptionForInvalidCondition() {
        assertThrows(IllegalArgumentException.class, () ->
                evaluator.evaluate("amount >", Map.of("amount", 2000))
        );
    }
}
