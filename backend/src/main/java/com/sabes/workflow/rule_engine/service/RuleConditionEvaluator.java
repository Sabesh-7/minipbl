package com.sabes.workflow.rule_engine.service;

import org.springframework.expression.Expression;
import org.springframework.expression.ExpressionParser;
import org.springframework.expression.spel.standard.SpelExpressionParser;
import org.springframework.expression.spel.support.StandardEvaluationContext;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.regex.Pattern;

/**
 * Evaluates rule conditions using Spring Expression Language (SpEL).
 *
 * Supported syntax in condition strings:
 *   - Comparison:  amount > 1000,  score <= 0.7,  status == 'ACTIVE',  name != 'test'
 *   - Logical:     AND, OR, NOT  (case-insensitive)
 *   - IN list:     currency IN ['USD', 'EUR']
 *   - NOT IN:      country NOT IN ['US', 'CA']
 *   - Parentheses: (amount > 1000) AND (currency == 'USD')
 *
 * Variable names come from the input map keys (no # prefix needed in conditions).
 */
@Component
public class RuleConditionEvaluator {

    private final ExpressionParser parser = new SpelExpressionParser();

    public boolean evaluate(String condition, Map<String, Object> input) {
        try {
            String processed = preprocess(condition, input);
            StandardEvaluationContext context = new StandardEvaluationContext();
            for (Map.Entry<String, Object> entry : input.entrySet()) {
                context.setVariable(entry.getKey(), entry.getValue());
            }
            Expression expression = parser.parseExpression(processed);
            return Boolean.TRUE.equals(expression.getValue(context, Boolean.class));
        } catch (Exception e) {
            throw new IllegalArgumentException("Condition evaluation failed: " + e.getMessage(), e);
        }
    }

    private String preprocess(String condition, Map<String, Object> input) {
        String processed = condition;

        // Handle NOT IN: var NOT IN ['a', 'b'] -> !{'a','b'}.contains(#var)
        processed = processed.replaceAll(
                "\\b(\\w+)\\s+NOT\\s+IN\\s+\\[([^\\]]+)\\]",
                "!{$2}.contains(#$1)"
        );

        // Handle IN: var IN ['a', 'b'] -> {'a','b'}.contains(#var)
        processed = processed.replaceAll(
                "\\b(\\w+)\\s+IN\\s+\\[([^\\]]+)\\]",
                "{$2}.contains(#$1)"
        );

        // Add # prefix to variable names from input (skip if already prefixed)
        for (String key : input.keySet()) {
            processed = processed.replaceAll(
                    "(?<!#)\\b" + Pattern.quote(key) + "\\b",
                    "#" + key
            );
        }

        // Replace English logical operators with SpEL equivalents
        processed = processed
                .replaceAll("(?i)\\bAND\\b", "&&")
                .replaceAll("(?i)\\bOR\\b", "||")
                .replaceAll("(?i)\\bNOT\\b", "!");

        return processed;
    }
}
