import PySimpleGUI as sg
import sqlite3

def create_table():
    con = sqlite3.connect('info.db')
    cur = con.cursor()
    cur.execute('''
        CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user TEXT NOT NULL,
            password TEXT NOT NULL
        )
        ''')
    con.commit()
    con.close()

def add_user(usuario, senha):
    con = sqlite3.connect('info.db')
    cur = con.cursor()
    cur.execute('INSERT INTO users (user, password) VALUES(?, ?)', (usuario, senha))
    con.commit()
    con.close()

def check(usuario, senha):
    con = sqlite3.connect('info.db')
    cur = con.cursor()
    cur.execute('SELECT * FROM users WHERE user = ? AND password = ?', (usuario, senha))
    resultado = cur.fetchone()
    con.close()
    return resultado is not None


layout = [
    [sg.Text('Usuário')],
    [sg.Input(key='usuario')],
    [sg.Text('Senha')],
    [sg.Input(key='senha')],
    [sg.Button('LOGIN'), sg.Button('CADASTRAR')],
    [sg.Text('', key='mensagem')],
]   

window = sg.Window('Login', layout=layout)
create_table()

while(True):
    event, values = window.read()
    if event == sg.WIN_CLOSED:
        break
    elif event == 'LOGIN':
        usuario = values['usuario'] 
        senha = values['senha']
        if check(usuario, senha) == False:
            window['mensagem'].update('Usuário e/ou senha incorreto')
        else:
            window['mensagem'].update('Login bem-sucedido')
    elif event == 'CADASTRAR':
        usuario = values['usuario']
        senha = values['senha']
        add_user(usuario, senha)
