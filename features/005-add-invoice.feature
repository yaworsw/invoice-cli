@005 @invoices
Feature: Creating invoices
  As a user of invoice CLI
  I want to be able to create invoices
  So that i can use the CLI for what it's supposed to do

  Background:
    Given I open the invoice the CLI

  Scenario: Seeing a list of clients to create an invoice for
    And I have a client

