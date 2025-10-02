CREATE OR REPLACE FUNCTION calculate_fit_score(user_id uuid, problem_id uuid)
RETURNS integer AS $$
DECLARE
    complexity integer;
    impact integer;
    score integer;
BEGIN
    SELECT p.complexity, p.impact
    INTO complexity, impact
    FROM problems p
    WHERE p.id = problem_id;

    -- Simplified formula for fit score
    score := (impact * 2) - complexity;
    RETURN score;
END;
$$ LANGUAGE plpgsql;
