import { AccomodationModule } from './accomodation.module';

describe('AccomodationModule', () => {
  let accomodationModule: AccomodationModule;

  beforeEach(() => {
    accomodationModule = new AccomodationModule();
  });

  it('should create an instance', () => {
    expect(accomodationModule).toBeTruthy();
  });
});
