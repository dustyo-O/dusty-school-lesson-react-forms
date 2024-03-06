import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

import { cnForm } from './Form.classname';
import type { FormFieldsData, Language, Level } from './types';

import './Form.css';
import { Select } from 'evergreen-ui';


const DEFAULT_STATE: FormFieldsData = { name: '', password: '', comment: '', language: '', agree: false, level: '' };
const DEFAULT_ERROR_STATE: { [key in keyof FormFieldsData]?: string } = {};
const LANGUAGES: Language[] = ['javascript', 'coffeescript', 'typescript'];
const LEVELS: Level[] = ['senior', 'middle', 'junior'];

const VERIFY: { [key in keyof FormFieldsData]?: { [key: string]: boolean } } = {
    name: {
        required: true,
    },
}

const Form = () => {
    const [form, setForm] = useState(DEFAULT_STATE);
    const [error, setError] = useState(DEFAULT_ERROR_STATE);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        console.log(form);

        for (const field in form) {
            const typedField: keyof FormFieldsData = field as keyof FormFieldsData;
            console.log();

            if (VERIFY[typedField]?.required && form[typedField] === '') {
                setError(prev => ({ ...prev, [typedField]: 'Обязательное поле' }));
            }

            if (VERIFY[typedField]?.required && form[typedField] !== '') {
                setError(prev => ({ ...prev, [typedField]: undefined }));
            }
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm((prev) => ({
            ...prev,
            [event.target.name]:
                event.target instanceof HTMLInputElement && event.target.type === 'checkbox' ?
                    event.target.checked : event.target.value
        }));
    };

    return (
        <form className={cnForm()} onSubmit={handleSubmit}>
            <div className={cnForm('Field', { error: Boolean(error.name) })}>
                <label className={cnForm('Label')} htmlFor="name">Ваше имя</label>
                <input
                    className={cnForm('Control')}
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                />
                {
                    error.name && <div className={cnForm('Error')}>{error.name}</div>
                }
            </div>
            <div className={cnForm('Field')}>
                <label className={cnForm('Label')} htmlFor="password">Пароль</label>
                <input
                    className={cnForm('Control')}
                    type="password"
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                />
            </div>
            <div className={cnForm('Field')}>
                <label className={cnForm('Label')} htmlFor="language">Любимый язык программирования</label>
                <Select
                    id="language"
                    name="language"
                    value={form.language}
                    onChange={handleChange}
                >
                    <option value="" disabled>Выберите...</option>
                    {
                        LANGUAGES.map(language => <option key={language} value={language}>{language}</option>)
                    }
                </Select>
            </div>
            <div className={cnForm('Field')}>
                <label className={cnForm('Label')} htmlFor="level">Уровень владения</label>
                    {
                        LEVELS.map(level => <React.Fragment key={level}>
                            <label>{level}</label>
                            <input
                                className={cnForm('Control')}
                                type="radio"
                                id={`level-${level}`}
                                name="level"
                                value={level}
                                onChange={handleChange}
                            />
                        </React.Fragment>)
                    }
            </div>
            <div className={cnForm('Field')}>
                <label className={cnForm('Label')} htmlFor="comment">Почему мы должны выбрать именно вас?</label>
                <textarea
                    className={cnForm('Control')}
                    id="comment"
                    name="comment"
                    value={form.comment}
                    onChange={handleChange}
                />
            </div>
            <div className={cnForm('Field')}>
                <label className={cnForm('Label')} htmlFor="agree">Согласен получать спам-рассылку</label>
                <input
                    className={cnForm('Control')}
                    type="checkbox"
                    id="agree"
                    name="agree"
                    checked={form.agree}
                    onChange={handleChange}
                />
            </div>
            <button className={cnForm('Submit')}>Отправить</button>
        </form>
    );
}

export { Form };
