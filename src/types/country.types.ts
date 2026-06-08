/**
 * Supported country codes for country-specific validation
 * Based on ISO 3166-1 alpha-2 standard
 */
export type CountryCode =
  | 'US' // United States
  | 'CA' // Canada
  | 'UK' // United Kingdom
  | 'DE' // Germany
  | 'FR' // France
  | 'CH' // Switzerland
  | 'IT' // Italy
  | 'ES' // Spain
  | 'AT' // Austria
  | 'NL' // Netherlands
  | 'BE' // Belgium
  | 'LU' // Luxembourg

/**
 * Country metadata with validation support
 */
export interface CountryMetadata {
  code: CountryCode
  name: string
  phonePrefix: string
  phoneFormat: string
  postalFormat: string
  supportsPhone: boolean
  supportsPostal: boolean
}

/**
 * All supported countries with their metadata
 */
export const COUNTRIES: Record<CountryCode, CountryMetadata> = {
  US: {
    code: 'US',
    name: 'United States',
    phonePrefix: '+1',
    phoneFormat: '+1 (555) 123-4567',
    postalFormat: '12345 or 12345-6789',
    supportsPhone: true,
    supportsPostal: true
  },
  CA: {
    code: 'CA',
    name: 'Canada',
    phonePrefix: '+1',
    phoneFormat: '+1 (416) 555-0123',
    postalFormat: 'K1A 0A6',
    supportsPhone: true,
    supportsPostal: true
  },
  UK: {
    code: 'UK',
    name: 'United Kingdom',
    phonePrefix: '+44',
    phoneFormat: '+44 20 7946 0958',
    postalFormat: 'SW1A 1AA',
    supportsPhone: true,
    supportsPostal: true
  },
  DE: {
    code: 'DE',
    name: 'Germany',
    phonePrefix: '+49',
    phoneFormat: '+49 30 12345678',
    postalFormat: '10115',
    supportsPhone: true,
    supportsPostal: true
  },
  FR: {
    code: 'FR',
    name: 'France',
    phonePrefix: '+33',
    phoneFormat: '+33 1 23 45 67 89',
    postalFormat: '75001',
    supportsPhone: true,
    supportsPostal: true
  },
  CH: {
    code: 'CH',
    name: 'Switzerland',
    phonePrefix: '+41',
    phoneFormat: '+41 44 123 45 67',
    postalFormat: '8001',
    supportsPhone: true,
    supportsPostal: true
  },
  IT: {
    code: 'IT',
    name: 'Italy',
    phonePrefix: '+39',
    phoneFormat: '+39 06 1234 5678',
    postalFormat: '00118',
    supportsPhone: true,
    supportsPostal: true
  },
  ES: {
    code: 'ES',
    name: 'Spain',
    phonePrefix: '+34',
    phoneFormat: '+34 91 123 4567',
    postalFormat: '28001',
    supportsPhone: true,
    supportsPostal: true
  },
  AT: {
    code: 'AT',
    name: 'Austria',
    phonePrefix: '+43',
    phoneFormat: '+43 1 1234567',
    postalFormat: '1010',
    supportsPhone: true,
    supportsPostal: true
  },
  NL: {
    code: 'NL',
    name: 'Netherlands',
    phonePrefix: '+31',
    phoneFormat: '+31 20 123 4567',
    postalFormat: '1012 JS',
    supportsPhone: true,
    supportsPostal: true
  },
  BE: {
    code: 'BE',
    name: 'Belgium',
    phonePrefix: '+32',
    phoneFormat: '+32 2 123 45 67',
    postalFormat: '1000',
    supportsPhone: true,
    supportsPostal: true
  },
  LU: {
    code: 'LU',
    name: 'Luxembourg',
    phonePrefix: '+352',
    phoneFormat: '+352 123 456 789',
    postalFormat: 'L-1111',
    supportsPhone: true,
    supportsPostal: true
  }
}
