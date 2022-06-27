import { gql } from "graphql-request";

export default gql`
  {
    workspace(id: "629f93918478ff001ee1809b") {
      upcomingSprint {
        issues {
          nodes {
            title
            assignees {
              nodes {
                login
              }
            }
            estimate {
              value
            }
          }
        }
      }
    }
  }
`;
