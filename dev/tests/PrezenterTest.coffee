should = chai.should()
log = (msg) ->
		console?.log msg


describe 'Prezenter', ->
	beforeEach ->
		@prez = new Prezenter()

	it 'should have 8 items in data', ->
		@prez.data.length.should.equal 8

	it 'should throw an error if an element doesn`t exist'
		@prez.init().should.throw "the element .img-me does not exist"
