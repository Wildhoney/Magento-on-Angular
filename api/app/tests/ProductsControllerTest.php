<?php

class ProductsControllerTest extends TestCase {

	public function testBasicExample()
	{
		$crawler = $this->client->request('GET', '/products/all');
		$this->assertTrue($this->client->getResponse()->isOk());
	}

}