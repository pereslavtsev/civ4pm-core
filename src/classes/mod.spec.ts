import { Game } from './game.class';
import Mod from './mod.class';

describe('game.mod', () => {
  const path =
    "C:/Program Files (x86)/Firaxis Games/Sid Meier's Civilization 4/Beyond the Sword";
  const game = Game.BtS(path);

  it('should be run without errors', async () => {
    expect.hasAssertions();
    await game.run('ClassicalEra');
  });

  // it('should be close without errors', async () => {
  //   expect.hasAssertions();
  //   await game.close();
  // });

  // describe('game.mod.list()', () => {
  //   let mods;
  //
  //   beforeAll(async () => {
  //     mods = await game.mod.list();
  //   });
  //
  //   it('result should be an array', async () => {
  //     expect.hasAssertions();
  //     expect(Array.isArray(mods)).toBe(true);
  //   });
  // });
  //
  // describe('game.mod.install()', () => {
  //   it('should be created without errors', async () => {
  //     expect.hasAssertions();
  //     await game.mod.install({
  //       package: 'C:\\Users\\pstra\\Downloads\\ClassicalEra.zip',
  //       folderName: 'ClassicalEra',
  //       //onExtract: (entry, outPath) => console.log(entry, outPath),
  //     });
  //     expect(true).toBe(true);
  //   });
  // });
  //
  // describe('game.mod.get()', () => {
  //   let mod: Mod;
  //
  //   beforeAll(async () => {
  //     mod = await game.mod.get('Rome Expanded');
  //   });
  //
  //   it('result should be instance of Mod class', async () => {
  //     expect.hasAssertions();
  //     expect(mod instanceof Mod).toBe(true);
  //   });
  // });
  //
  // describe('game.mod.create()', () => {
  //   it('should be created without errors', async () => {
  //     expect.hasAssertions();
  //     await game.mod.create('my');
  //     expect(true).toBe(true);
  //   });
  // });
  //
  // describe('game.mod.remove()', () => {
  //   it('should be removed without errors', async () => {
  //     expect.hasAssertions();
  //     await game.mod.remove('my');
  //     expect(true).toBe(true);
  //   });
  // });
});
