@008 @invoices
Feature: Viewing previously created invoices
  As a user of invoice CLI
  I want to be able to view invoices that I've created before
  So that I don't accidentally double bill a client

  Background:
    Given I have created some invoices before
    And I open the invoice the CLI

  Scenario: Being asked to select a client and invoice
    And I select "View Invoices"
    Then I should be asked "Choose a client"
    When I press enter
    Then I should be asked "Choose an invoice"
