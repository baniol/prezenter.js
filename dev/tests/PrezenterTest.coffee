should = chai.should()
log = (msg) ->
		console?.log msg


describe 'Prezenter', ->
	beforeEach ->
		@prez = new Prezenter()

	it 'should have 8 items in data', ->
		@prez.data.length.should.equal 8
