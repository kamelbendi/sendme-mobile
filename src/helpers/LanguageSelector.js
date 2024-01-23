import english from '../languages/English';
import french from '../languages/French';

export default function languageSelector(languageCode) {
  switch (languageCode) {
    case 'en': return english;
    case 'fr': return french;
    default: return english;
  }
}
