package com.NeuroMatch.NeuroMatch.util;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class HelperMethods {

    public static String stripScoreSection(String text) {
        if (text == null) return null;
        int braceIndex = text.indexOf("{");
        if (braceIndex > -1) {
            return text.substring(0, braceIndex).trim();
        }
        return text.trim();
    }

    public static Map<String, Integer> extractScoreAndTime(String text) {
        Map<String, Integer> result = new HashMap<>();
        Pattern pattern = Pattern.compile("\\{\\s*score\\s*:\\s*(\\d+)\\s*,\\s*expected_time\\s*:\\s*(\\d+)\\s*\\}");
        Matcher matcher = pattern.matcher(text);
        if (matcher.find()) {
            result.put("score", Integer.parseInt(matcher.group(1)));
            result.put("expected_time", Integer.parseInt(matcher.group(2)));
        }
        return result;
    }


}
