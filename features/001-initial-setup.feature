@001 @initial-setup
Feature: Initial setup
  As a user of invoice CLI
  I want to be prompted to enter some settings the first time I open the app
  So that later on I can manage my invoices without entering the same data over and over

  Background:
    Given I open invoice the CLI for the first time

  Scenario: Prompt shown upon first launch
    Then I should be welcomed

  Scenario: Being asked for my name
    Then I should be asked "What is your name?"

  Scenario: Being asked for my email address
    When I enter my name
    Then I should be asked "What is your email address?"

  Scenario: Advancing to the main menu after entering my email address
    When I enter my name
    And I enter my email
    Then I should be at the main menu
