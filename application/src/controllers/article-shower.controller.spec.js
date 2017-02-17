describe('editor component', () => {
  var ctrl, $httpBackend, scope, locationMock, backendHost;

  beforeEach(() => {
    module('app');
    inject(($componentController, _$httpBackend_,
      $rootScope, backend) => {

      $httpBackend = _$httpBackend_;
      backendHost = backend;

      locationMock = { path: () => {}};
      spyOn(locationMock, 'path');

      ctrl = $componentController('create', {
        $scope: $rootScope,
        $location: locationMock
      });
      jasmine.addCustomEqualityTester(angular.equals);
    });
  });

  afterEach(() => {
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('exists', () => expect(ctrl).toBeDefined());

  it('initializes article model after created', () => {
    expect(ctrl.imagePreview).toBe(null);
    expect(ctrl.article).toEqual({
      title: '', author: '', description: '', text: ''
    });
  });

  it('createArticle() makes appropriate requests', () => {
    ctrl.file = 'fakeFile';
    $httpBackend.whenPOST(`${backendHost}/articles`)
      .respond({ _id: '0', title: '1', urlToImg: '2',
        description: '3', publishedAt: '4', author: '5' });
    $httpBackend.whenPOST(`${backendHost}/images/0`)
      .respond({});

    ctrl.createArticle();
    $httpBackend.flush();
    setTimeout(function() {
      $httpBackend.flush();

      expect(locationMock.path).toHaveBeenCalledWith('/');
    }, 1);
  });
});