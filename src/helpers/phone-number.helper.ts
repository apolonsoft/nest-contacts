import * as phone from 'phone'
import { ContactPhone } from 'src/contacts/interfaces/contact-phone.interface'

/**
 * Used for checking array for ussd commands
 *
 * example: '*100#' => false
 *
 * @param str - single number from an array
 */
const isUssdCommand = (str: string): boolean =>
    str.includes('*') || str.includes('#')

/**
 * Used for formmating phone numbers
 * example: '+7 999 444-55-44' => '+79994445544'
 *
 * @param str - single number from an array
 */
const formatPhoneNumber = (str: string): string =>
    str.replace(/((?!=\+)[-_\s*\(\)])/g, '')

/**
 * Used for filtering array from invalid numbers
 *
 * example: '+7gfh999();444xvx5544' => false
 *
 * @param str - single number from an array
 */
const filtredPhoneNumbers = (str: string): boolean =>
    /[^\D]/i.test(str) || str.length > 9 || str.length < 15

/**
 * Used for checking numbers and finding numbers that could be really exist
 *
 * example: '89994445654' => true,
 *          '4987415649849874' => false
 *
 * @param str - single number from an array
 */
const phoneNumberValidation = (str: string): boolean => {
    const [validPhone] = phone(str)

    if (validPhone != null) {
        return true
    }
    const newone = '+' + str
    const [phoneNewOne] = phone(newone)

    if (phoneNewOne != null) {
        return true
    }
    const result =
        newone.length === 12 && newone.startsWith('+8')
            ? '+7' + newone.slice(2)
            : newone

    const [phoneResult] = phone(result)

    return phoneResult != null
}

/**
 * Used to filter out invalid strings and format valid ones in an object array of numbers
 *
 * example: [{phone: '*100#'}, {phone: '+79995554433'}, {phone: '8999jkhk5552211'}, {phone: '8 (555)-333-88-22'}]
 *          => [{phone: '+79995554433'},{phone: '85553338822'}]
 *
 * @param phones - array of objects
 */
export function filterInvalidPhoneNumbers(
    phones: ContactPhone[],
): ContactPhone[] {
    if (!phones) {
        throw new Error('NULL is not valid value')
    }

    const notUssd = phones.filter(ussd => !isUssdCommand(ussd.phone))

    const formated = notUssd.map(contactPhone => {
        contactPhone.phone = formatPhoneNumber(contactPhone.phone)
        return contactPhone
    })

    const filtred = formated.filter(contactPhone =>
        filtredPhoneNumbers(contactPhone.phone),
    )

    const phonesFilter = filtred.filter(contactPhone =>
        phoneNumberValidation(contactPhone.phone),
    )

    return phonesFilter
}
