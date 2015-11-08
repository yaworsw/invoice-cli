@002 @clients
Feature: Add Client
  As a user of invoice CLI
  I want to be able to add clients
  So that later on I can

  Background:
    Given I open the invoice the CLI

  Scenario: Open with main menu
    Then I should be at the main menu

  Scenario: See option to add new client
    Then I should see an option to add a new client

  Scenario: Setting a new client's name
    When I choose to add a new client
    Then I should be asked to "Enter a name for the client"

  @fast
  Scenario: Setting a new client's email
    When I choose to add a new client
    And I enter the client's name
    Then I should be asked to "Enter the email address for the client"

  @fast
  Scenario: Being taken back to the main menu after adding a client
    When I choose to add a new client
    And I enter the client's name
    And I enter the client's email
    Then I should be at the main menu
