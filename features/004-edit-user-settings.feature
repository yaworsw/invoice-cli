@004 @settings
Feature: Editing User Settings
  As a user of invoice CLI
  I want to be see edit the settings I entered the first time I ran the CLI
  So that I can update the information should it change

  Background:
    Given I open the invoice the CLI
    And I select "Settings"

  Scenario Outline: Editing a setting
    When I select "<name>"
    Then I should be asked "<question>"

    Examples:
      | name  | question                     |
      | Email |  What is your email address? |
      | Name  |  What is your name           |
