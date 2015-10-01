@003 @settings
Feature: Managing User Settings
  As a user of invoice CLI
  I want to be see the settings I entered when I first ran the CLI
  So that I can know if I need to update that information later on

  Background:
    Given I open the invoice the CLI
    And I select "Settings"

  Scenario Outline: Settings menu displays my currently entered information
    Then I should see "<name> (<value>)"

    Examples:
      | name  | value              |
      | Email | admin@the-wall.org |
      | Name  | John Snow          |
