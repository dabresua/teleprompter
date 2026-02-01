/**
 * Configuration constants and templates
 * Pure data - no dependencies
 */
(function() {
    'use strict';

    // ===== Persona Templates =====
    window.personaTemplates = {
        "Senior Software Engineer": "You are a senior software engineer with extensive experience in software architecture, design patterns, and best practices. You write clean, maintainable code and prioritize scalability and performance.",
        "Security Engineer": "You are an experienced security engineer specializing in web application vulnerabilities, secure coding practices, and threat modeling. You prioritize security best practices and can identify potential vulnerabilities.",
        "Data Scientist": "You are a data scientist with expertise in statistical analysis, machine learning, and data visualization. You can explain complex analytical concepts clearly and provide actionable insights from data.",
        "Product Manager": "You are an experienced product manager who understands user needs, market dynamics, and product strategy. You can balance technical constraints with business objectives and communicate effectively with both technical and non-technical stakeholders.",
        "Technical Writer": "You are a skilled technical writer who can explain complex technical concepts in clear, accessible language. You create well-structured documentation with appropriate examples and diagrams.",
        "UX Designer": "You are a UX designer with expertise in user research, interaction design, and usability principles. You focus on creating intuitive, accessible, and user-centered designs.",
        "DevOps Engineer": "You are a DevOps engineer experienced in CI/CD pipelines, infrastructure as code, containerization, and cloud platforms. You prioritize automation, reliability, and monitoring.",
        "Business Analyst": "You are a business analyst skilled at understanding business requirements, process optimization, and translating between technical and business stakeholders. You focus on delivering measurable business value.",
        "Marketing Specialist": "You are a marketing specialist with expertise in content strategy, audience segmentation, and digital marketing. You understand how to create compelling messaging that resonates with target audiences.",
        "Creative Writer": "You are a creative writer with a strong command of narrative techniques, character development, and engaging storytelling. You can write in various styles and genres while maintaining voice consistency.",
        "Teacher/Educator": "You are an experienced educator who can break down complex topics into digestible lessons. You use clear explanations, relevant examples, and check for understanding."
    };

    // ===== Audience Templates =====
    window.audienceTemplates = {
        "Technical - Software Developers": "Target audience: software developers with professional coding experience. Use appropriate technical terminology.",
        "Technical - System Architects": "Target audience: senior system architects familiar with distributed systems and scalability patterns. Focus on architectural decisions and trade-offs.",
        "Technical - Data Engineers": "Target audience: data engineers experienced with data pipelines, ETL processes, and big data technologies.",
        "Technical - DevOps/SRE": "Target audience: DevOps engineers and SREs familiar with infrastructure automation and reliability engineering.",
        "Semi-Technical - Product Managers": "Target audience: product managers with technical awareness but without deep engineering expertise. Balance technical detail with business context.",
        "Semi-Technical - Technical Project Managers": "Target audience: technical project managers who understand development workflows but may not code regularly.",
        "Non-Technical - Business Stakeholders": "Target audience: non-technical business stakeholders. Avoid jargon and use clear, accessible language.",
        "Non-Technical - C-Level Executives": "Target audience: C-level executives who need high-level insights and business impact. Focus on strategic implications rather than technical details.",
        "Non-Technical - Marketing/Sales Teams": "Target audience: marketing and sales professionals who need to understand capabilities without implementation details.",
        "Students/Learners - Beginners": "Target audience: beginners with little to no prior knowledge. Use simple language, provide context, and include educational explanations.",
        "Students/Learners - Intermediate": "Target audience: intermediate learners with foundational knowledge seeking to deepen understanding.",
        "Students/Learners - Advanced": "Target audience: advanced learners or practitioners looking for expert-level insights and nuanced understanding.",
        "General Public": "Target audience: general public with no specialized knowledge. Use everyday language and analogies. Avoid all jargon."
    };

    // ===== Constants =====
    window.MAX_EXAMPLES = 5;
    window.MIN_COT_STEPS = 2;
    window.MAX_COT_STEPS = 10;

    // ===== Response Length Text Mapping =====
    window.responseLengthTexts = {
        'brief': 'Keep response brief and concise (under 200 words)',
        'moderate': 'Provide moderate detail (200-500 words)',
        'detailed': 'Provide detailed analysis (500-1000 words)',
        'comprehensive': 'Provide comprehensive coverage (over 1000 words)'
    };

    // ===== XML Tags for Prompt Sections =====
    window.XML_TAGS = {
        persona: 'persona',
        audience: 'audience',
        constraints: 'constraints',
        context: 'context',
        inputData: 'input_data',
        instructions: 'instructions',
        outputFormat: 'output_format',
        reasoning: 'reasoning',
        code: 'code_requirements',
        creative: 'creative_guidelines',
        research: 'research_guidelines',
        quality: 'quality',
        selfReview: 'self_review',
        antiHallucination: 'anti_hallucination',
        validation: 'validation',
        iterative: 'iterative_approach',
        negative: 'constraints_negative',
        safety: 'safety_ethics'
    };

    /**
     * Wrap content in XML tags
     * @param {string} tagName - The tag name to use
     * @param {string} content - The content to wrap
     * @param {Object} [attributes] - Optional attributes for the tag
     * @returns {string} XML-wrapped content
     */
    window.wrapXml = function(tagName, content, attributes) {
        if (!content || !content.trim()) {
            return '';
        }
        
        var openTag = '<' + tagName;
        if (attributes) {
            for (var key in attributes) {
                if (attributes.hasOwnProperty(key)) {
                    openTag += ' ' + key + '="' + attributes[key] + '"';
                }
            }
        }
        openTag += '>';
        
        return openTag + '\n' + content.trim() + '\n</' + tagName + '>';
    };

})();
