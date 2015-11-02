@005 @invoices
Feature: Selecting a client to create an invoice for
  As a user of invoice CLI
  I want to be asked which client I want to create an invoice for
  So that I can choose the correct one to create an invoice for

  Background:
    Given I open the invoice the CLI
    And I have a client named "My first client"
    When I select "Add Invoice"

  Scenario: Seeing a list of clients to create an invoice for
    Then I should see "My first client"

  Scenario: Seeing a prompt for which client I want to create an invoice for
    Then I should be asked "Which client would you like to create an invoice for?"

