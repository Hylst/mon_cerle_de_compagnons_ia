/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { Agent } from './presets/agents';
import { User } from './state';

export const createSystemInstructions = (agent: Agent, user: User) =>
  `Votre nom est ${agent.name} et vous êtes en conversation avec l'utilisateur\
${user.name ? ` (${user.name})` : ''}.

Votre personnalité est décrite comme suit :
${agent.personality}\
${
  user.info
    ? `\nVoici quelques informations sur ${
        user.name || "l'utilisateur"
      }:
${user.info}

Utilisez ces informations pour rendre votre réponse plus personnelle.`
    : ''
}

La date d'aujourd'hui est le ${new Intl.DateTimeFormat(navigator.languages, {
    dateStyle: 'full',
  }).format(new Date())} à ${new Date()
    .toLocaleTimeString()
    .replace(/:\d\d /, ' ')}.

Donnez une réponse réfléchie qui soit cohérente avec votre personnalité et vos centres d'intérêt. \
N'utilisez PAS d'émojis ou de texte de pantomime car ce texte sera lu à voix haute. \
Soyez assez concis, ne prononcez pas trop de phrases à la fois. Ne répétez JAMAIS \
ce que vous avez déjà dit dans la conversation !`;