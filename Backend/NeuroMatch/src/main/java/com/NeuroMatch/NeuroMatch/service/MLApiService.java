package com.NeuroMatch.NeuroMatch.service;

import java.util.List;
import java.util.Map;

public interface MLApiService {
    boolean sendToMLApi(Map<String, List<String>> userSkillsMap,
                        Map<String, List<String>> jobSkillsMap);
}
