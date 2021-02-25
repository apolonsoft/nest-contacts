import { ContactAddress } from '../interfaces/contact-address.interface'
import { ContactEmail } from '../interfaces/contact-email.interface'
import { ContactPhone } from '../interfaces/contact-phone.interface'
import { ContactSocial } from '../interfaces/contact-social.interface'
import { ContactUrl } from '../interfaces/contact-url.interface'

type T =
    | ContactAddress
    | ContactEmail
    | ContactUrl
    | ContactSocial
    | ContactPhone

export const merge = ($new: T[], existing: T[]): any[] => {
    const merged = new Map<string, T>()

    if (existing) {
        existing.forEach(e => merged.set(e.type?.toUpperCase(), e))
    }

    if ($new) {
        $new.forEach(e => merged.set(e.type?.toUpperCase(), e))
    }

    return Array.from(merged.values())
}
