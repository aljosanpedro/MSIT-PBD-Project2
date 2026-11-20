with descriptions(description, position) as (
  values
    (
      'Supports clients managing anxiety, panic symptoms, stress, and emotional regulation through practical coping strategies.',
      1
    ),
    (
      'Helps people navigate depression, low mood, self-esteem concerns, and changes in motivation with compassionate care.',
      2
    ),
    (
      'Provides trauma-informed support for difficult experiences, post-traumatic stress, grief, and recovery.',
      3
    ),
    (
      'Works with clients on attention difficulties, ADHD-related concerns, organization, and healthy daily routines.',
      4
    ),
    (
      'Offers guidance for relationship concerns, family communication, boundaries, and conflict resolution.',
      5
    ),
    (
      'Supports clients experiencing burnout, work stress, sleep concerns, and challenges with maintaining balance.',
      6
    ),
    (
      'Helps individuals understand obsessive thoughts, compulsive behaviors, fears, and patterns that affect daily life.',
      7
    ),
    (
      'Provides support for grief, life transitions, loneliness, adjustment concerns, and building personal resilience.',
      8
    ),
    (
      'Works with adolescents and adults on identity, self-acceptance, confidence, and emotional wellbeing.',
      9
    ),
    (
      'Helps clients develop mindfulness, stress-management, communication, and healthy emotional coping skills.',
      10
    )
),
numbered_clinicians as (
  select id, row_number() over (order by id) as position
  from public.clinicians
)
update public.clinicians as clinicians
set description = descriptions.description
from numbered_clinicians
join descriptions
  on descriptions.position = ((numbered_clinicians.position - 1) % 10) + 1
where clinicians.id = numbered_clinicians.id;
