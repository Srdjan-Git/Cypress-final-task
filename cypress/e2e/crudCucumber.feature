
Feature: Crud

    Scenario: Logging into the application and testing the crud

        Given Visit page
        When Enter email
        When Enter password
        When Click on button Sign in
        Then Assert URL
        When Click on button New Article
        When Set value to Arricle Title
        When Set value to What is this article about
        When Set value to Write your Article
        When Set value to Enter tags
        When Click on button Publish Article
        When Click on button Home
        Then Assert first article on the page after create article
        When Click on first article on the page
        When Click on button Edit Article
        When Edit value to Arricle Title
        When Click on button Publish Article
        When click on link conduit
        Then Assert first article on the page after Edit article
        When Click on first article on the page
        When Click on button Delete Article
        Then Assert first article on the page after delete article