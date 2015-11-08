@007 @invoices @fast
Feature: Using the biweekly template
  As a user of invoice CLI
  I want to be able to use the biweekly template
  So that I can create the my most common type of invoices easier

  Background:
    Given I open the invoice the CLI
    And I have a client named "My first client"
    And I select "Add Invoice"
    And I select "My first client"
    And I select "Biweekly"

  Scenario: Being asked which week to create a template for
    Then I should be asked "Select the week which your invoice STARTS"

  Background:
    Given I open the invoice the CLI
    And I have a client named "My first client"
    And I select "Add Invoice"
    And I select "My first client"
    And I select "Biweekly"
    When I press enter

  Scenario: Being asked rate
    Then I should be asked "What is your hourly rate"

  Scenario: Being asked hours worked for each week
    When I enter "50"
    Then I should be asked "How many hours billable for the week of"
    When I enter "40"
    Then I should be asked "How many hours billable for the week of"

  Background:
    Given I open the invoice the CLI
    And I have a client named "My first client"
    And I select "Add Invoice"
    And I select "My first client"
    And I select "Biweekly"
    When I press enter
    And I enter "50"
    And I enter "40"
    And I enter "38"

  Scenario: Returning to the main menu after creating a biweekly invoice
    Then I should be at the main menu
