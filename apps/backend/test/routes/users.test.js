import { test } from 'node:test';
import * as assert from 'node:assert';
import { build } from '../helper.js';
import { users } from '../../services/usersService.js';

const resetUsers = () => {
    for (const key in users) {
        delete users[key];
    }
};

test('POST /users - should create a user', async (t) => {
    const app = await build(t);

    const res = await app.inject({
        method: 'POST',
        url: '/users',
        payload: { username: 'novascript-dev' }
    });

    assert.strictEqual(res.statusCode, 201);
    const responseBody = JSON.parse(res.payload);
    assert.strictEqual(responseBody.username, 'novascript-dev');
    assert.ok(users['novascript-dev'], 'User should be in the users list');
});

test('POST /users - should return error if user already exists', async (t) => {
    const app = await build(t);

    await app.inject({
        method: 'POST',
        url: '/users',
        payload: { username: 'novascript-dev' }
    });

    const res = await app.inject({
        method: 'POST',
        url: '/users',
        payload: { username: 'novascript-dev' }
    });

    assert.strictEqual(res.statusCode, 409);
    const responseBody = JSON.parse(res.payload);
    assert.strictEqual(responseBody.message, 'Usuário já está na lista de favoritos');
});

test('POST /users - should return error if limit of users reached', async (t) => {
    const app = await build(t);

    for (let i = 1; i <= 5; i++) {
        await app.inject({
            method: 'POST',
            url: '/users',
            payload: { username: `user${i}` }
        });
    }

    const res = await app.inject({
        method: 'POST',
        url: '/users',
        payload: { username: 'user6' }
    });

    assert.strictEqual(res.statusCode, 403);
    const responseBody = JSON.parse(res.payload);
    assert.strictEqual(responseBody.message, 'Limite de 5 usuários favoritos atingido');
});

test('PATCH /users/:username/toggle-star - should return error if user does not exist', async (t) => {
    const app = await build(t);
    
    const res = await app.inject({
        method: 'PATCH',
        url: '/users/esseusuarionaoexisteexemplo/toggle-star'
    });

    assert.strictEqual(res.statusCode, 404);
    const responseBody = JSON.parse(res.payload);
    assert.strictEqual(responseBody.message, 'Usuário não encontrado');
});


test('GET /users - should return users', async (t) => {
    resetUsers();
    const app = await build(t);

    // Adiciona um usuário
    await app.inject({
        method: 'POST',
        url: '/users',
        payload: { username: 'novascript-dev' }
    });

    const res = await app.inject({
        method: 'GET',
        url: '/users?sort=asc'
    });

    assert.strictEqual(res.statusCode, 200);
    const usersList = JSON.parse(res.payload);
    assert.strictEqual(usersList[0].username, 'novascript-dev');
});

test('DELETE /users/:username - should delete a user', async (t) => {
    resetUsers();
    const app = await build(t);

    await app.inject({
        method: 'POST',
        url: '/users',
        payload: { username: 'novascript-dev' }
    });

    const res = await app.inject({
        method: 'DELETE',
        url: '/users/novascript-dev'
    });

    assert.strictEqual(res.statusCode, 204);
    assert.strictEqual(users['novascript-dev'], undefined, 'User should be deleted');
});

test('PATCH /users/:username/toggle-star - should toggle star', async (t) => {
    resetUsers();
    const app = await build(t);

    await app.inject({
        method: 'POST',
        url: '/users',
        payload: { username: 'novascript-dev' }
    });

    const res = await app.inject({
        method: 'PATCH',
        url: '/users/novascript-dev/toggle-star'
    });

    assert.strictEqual(res.statusCode, 200);
    const user = JSON.parse(res.payload);
    assert.ok(user.user.starred, 'User should be starred');

    const resToggle = await app.inject({
        method: 'PATCH',
        url: '/users/novascript-dev/toggle-star'
    });

    assert.strictEqual(resToggle.statusCode, 200);
    const userToggled = JSON.parse(resToggle.payload);
    assert.ok(!userToggled.user.starred, 'User should be unstarred');
});

test('PATCH /users/:username/toggle-star - should toggle star and ensure only one user is starred', async (t) => {
    resetUsers();
    const app = await build(t);

    await app.inject({
        method: 'POST',
        url: '/users',
        payload: { username: 'ElonMusk' }
    });
    await app.inject({
        method: 'POST',
        url: '/users',
        payload: { username: 'novascript-dev' }
    });
    await app.inject({
        method: 'POST',
        url: '/users',
        payload: { username: 'AndersonSilva' }
    });

    const res = await app.inject({
        method: 'PATCH',
        url: '/users/novascript-dev/toggle-star'
    });

    assert.strictEqual(res.statusCode, 200);
    let user = JSON.parse(res.payload);
    
    assert.ok(user.user.starred, 'novascript-dev should be starred');
    assert.strictEqual(users['ElonMusk'].starred, false, 'Elon Musk should not be starred');
    assert.strictEqual(users['AndersonSilva'].starred, false, 'Anderson Silva should not be starred');

    const resToggle = await app.inject({
        method: 'PATCH',
        url: '/users/novascript-dev/toggle-star'
    });

    assert.strictEqual(resToggle.statusCode, 200);
    const userToggled = JSON.parse(resToggle.payload);
    assert.ok(!userToggled.user.starred, 'novascript-dev should be unstarred');
});

