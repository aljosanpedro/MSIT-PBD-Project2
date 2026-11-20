update public.clinicians
set description = description || case role
  when 'Clinical Psychologist' then
    ' Services include individual therapy, psychological assessment, and stress-management counseling.'
  when 'Psychiatrist' then
    ' Services include psychiatric consultation, medication management, and mental health reviews.'
  when 'Counseling Therapist' then
    ' Services include individual counseling, supportive therapy, and guided coping sessions.'
  when 'Behavioral Therapist' then
    ' Services include behavioral therapy, skills training, and structured support plans.'
  when 'Clinical Counselor' then
    ' Services include clinical counseling, wellness planning, and adjustment support.'
  when 'Family Therapist' then
    ' Services include family counseling, relationship therapy, and communication sessions.'
  else
    ' Services include mental health consultation and supportive counseling.'
end
where description not like '%Services include%';
