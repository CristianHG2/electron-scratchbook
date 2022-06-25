import client from '../zenhub';
import {gql} from 'graphql-request';
import {Response} from '../../../../types/zenhub';

export default (): Promise<Response> => client.request(
    gql`
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
  `);
