@006 @invoices
Feature: Selecting an invoice template
  As a user of invoice CLI
  I want to be able to select an invoice template
  So that I can generate invoices even faster

  Background:
    Given I open the invoice the CLI
    And I have a client named "My first client"
    And I select "Add Invoice"
    And I select "My first client"

  Scenario: Having the option to select an empty template
    Then I should see "Empty"

  Scenario: Having the option to select a biweekly template
    Then I should see "Biweekly"

  Scenario: Being asked to select a template
    Then I should be asked "Select a template"
