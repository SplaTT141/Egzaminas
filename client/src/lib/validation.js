export function usernameIsInvalid(username) {
    if (!username) {
        return `Vartotojo vardas yra privalomas`
    }

    if (typeof username !== 'string') {
        return `Vartotojo vardas turi būti tekstas`;
    }

    if (username.length < 3) {
        return `Vartotojo vardą turi sudaryti bent 3 simboliai`;
    }

    if (username.length > 20) {
        return `Vartotojo vardą turi sudaryti ne daugiau 20 simbolių`;
    }

    if (username.includes(' ')) {
        return 'Vartotojo vardas neturi turėti tarpų';
    }

    const validSymbols = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789';
    const foundInvalidSymbols = [];

    for (const s of username) {
        if (!validSymbols.includes(s)) {
            foundInvalidSymbols.push(s);
        }
    }

    if (foundInvalidSymbols.length) {
        return `Vartotojo varde yra neleistini simboliai: ${foundInvalidSymbols.join(', ')}`
    }

    return '';
}

export function emailIsInvalid(email) {
    if (!email) {
        return `El. paštas yra privalomas`;
    }

    if (typeof email !== 'string') {
        return `El. paštas turi būti tekstas`;
    }

    if (email.length < 5) {
        return `El. paštą turi sudaryti bent 5 simboliai`;
    }

    if (email.length > 50) {
        return `El. paštą turi sudaryti ne daugiau 50 simbolių`;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return `Netinkamas el. pašto formatas`;
    }

    return '';
}

export function passwordIsInvalid(password) {
    if (!password) {
        return 'Slaptažodis yra privalomas';
    }

    if (typeof password !== 'string') {
        return 'Slaptažodis turi būti teksto tipo';
    }

    if (password.length < 6) {
        return 'Slaptažodį turi sudaryti ne mažiau 6 simbolių';
    }

    if (password.length > 40) {
        return 'Slaptažodį negali sudaryti daugiau 40 simbolių';
    }

    return '';
}

export function passwordRepeatIsInvalid(passwordRepeat, password) {
    if (!passwordRepeat) {
        return 'Pakartokite slaptažodį'
    }

    if (passwordRepeat !== password) {
        return 'Slaptažodžiai yra nevienodi'
    }

    return '';
}

export function usernameOrEmailIsInvalid(usernameOrEmail) {
    if (!usernameOrEmail) {
        return `Vartotojo vardas arba el. paštas yra privalomas`
    }

    if (typeof usernameOrEmail !== 'string') {
        return `Vartotojo vardas arba el. paštas turi būti tekstas`;
    }

    if (usernameOrEmail.length < 3) {
        return `Vartotojo vardą arba el. paštą turi sudaryti bent 3 simboliai`;
    }

    if (usernameOrEmail.length > 50) {
        return `Vartotojo vardą arba el. paštą turi sudaryti ne daugiau 50 simbolių`;
    }

    return '';
}


export function eventNameIsValid(name) {
    if (!name) {
        return `Renginio pavadinimas yra privalomas`
    }

    if (typeof name !== 'string') {
        return `Renginio pavadinimas turi būti tekstas`;
    }

    if (name.length < 1) {
        return `Renginio pavadinimą turi sudaryti bent ą simboliai`;
    }

    if (name.length > 30) {
        return `Renginio pavadinimą turi sudaryti ne daugiau 30 simbolių`;
    }

    return '';
}

export function eventCategoryIsValid(category) {
    if (!category) {
        return `Renginio kategorija yra privaloma`
    }

    if (typeof category !== 'string') {
        return `Renginio kategorija turi būti tekstas`;
    }

    if (category.length < 1) {
        return `Renginio kategorija turi sudaryti bent 1 simboliai`;
    }

    if (category.length > 30) {
        return `Renginio kategoriją turi sudaryti ne daugiau 30 simbolių`;
    }

    return '';
}

export function eventPlaceIsValid(place) {
    if (!place) {
        return `Renginio vieta yra privaloma`
    }

    if (typeof place !== 'string') {
        return `Renginio vieta turi būti tekstas`;
    }

    if (place.length < 1) {
        return `Renginio vietos pavadinimą turi sudaryti bent 1 simboliai`;
    }

    if (place.length > 40) {
        return `Renginio vietos pavadinimą turi sudaryti ne daugiau 40 simbolių`;
    }

    return '';
}